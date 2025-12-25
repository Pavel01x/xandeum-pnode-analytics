/**
 * pRPC API Client for Xandeum pNode Network
 * 
 * BLOCKER: This file requires Discord API answers before implementation.
 * 
 * NEEDED FROM DISCORD:
 * 1. Exact HTTP endpoint format (http://ip:port/path)
 * 2. Complete JSON schema for get_pods_with_stats response
 * 3. Rate limits
 * 4. Authentication requirements
 * 5. CORS configuration
 * 6. WebSocket support (if any)
 * 
 * Current implementation is a SKELETON waiting for real API details.
 */

import axios, { AxiosInstance } from 'axios';
import { PNode, PNodesResponse, ApiError } from '@/types/pnode';

const PRPC_ENDPOINT = process.env.NEXT_PUBLIC_PRPC_ENDPOINT || '';

// TODO: Verify these seed node IPs from Discord
const SEED_NODES = [
    '173.212.220.65',
    '161.97.97.41',
    '192.190.136.36',
    '192.190.136.38',
    '207.244.255.1',
    '192.190.136.28',
    '192.190.136.29',
    '173.212.203.145',
];

export class PRPCClient {
    private client: AxiosInstance;
    private endpoint: string;

    constructor(endpoint: string = PRPC_ENDPOINT) {
        this.endpoint = endpoint;

        this.client = axios.create({
            baseURL: endpoint,
            timeout: 10000, // 10 second timeout
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor for logging/debugging
        this.client.interceptors.request.use(
            (config) => {
                console.log('[pRPC Request]', config.method?.toUpperCase(), config.url);
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor for error handling
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                const apiError: ApiError = {
                    code: error.response?.status?.toString() || 'NETWORK_ERROR',
                    message: error.message || 'Unknown error occurred',
                    details: error.response?.data,
                };
                return Promise.reject(apiError);
            }
        );
    }

    /**
     * Fetch all pNodes from the network
     * 
     * BLOCKER: Method name and request format need verification from Discord
     * - Is it get_pods() or get_pods_with_stats()?
     * - What's the exact JSON-RPC format?
     * - What parameters are required?
     */
    async getPNodes(): Promise<PNode[]> {
        try {
            // TODO: Replace with actual API call once Discord provides details
            throw new Error(
                'API endpoint not configured. Please join Discord and get pRPC endpoint details.'
            );

            // PLACEHOLDER - Will be replaced with real implementation:
            // const response = await this.client.post('/', {
            //   jsonrpc: '2.0',
            //   id: 1,
            //   method: 'get_pods_with_stats', // VERIFY THIS
            //   params: [], // VERIFY PARAMS
            // });
            //
            // return this.transformResponse(response.data.result);
        } catch (error) {
            console.error('[pRPC Error] Failed to fetch pNodes:', error);
            throw error;
        }
    }

    /**
     * Transform raw API response to PNode format
     * 
     * BLOCKER: Response schema needs verification from Discord
     */
    private transformResponse(rawNodes: any[]): PNode[] {
        const now = Date.now();

        return rawNodes.map((node, index) => ({
            id: node.pubkey || `pnode-${index}`,
            pubkey: node.pubkey,
            address: node.address || '',
            gossip: node.gossip || null,
            rpc: node.rpc || null,
            version: node.version || null,
            lastSeen: node.last_seen || now,
            uptime: node.uptime,
            storageUsed: node.storage_used,
            storageCapacity: node.storage_capacity,
            latency: node.latency,
            status: this.calculateStatus(node),
            healthScore: this.calculateHealthScore(node),
        }));
    }

    /**
     * Calculate pNode status based on available data
     */
    private calculateStatus(node: any): 'active' | 'inactive' | 'degraded' {
        // Simple logic - will be refined based on actual data
        if (!node.rpc && !node.gossip) return 'inactive';
        if (node.uptime && node.uptime < 95) return 'degraded';
        return 'active';
    }

    /**
     * Calculate health score (0-100)
     * 
     * Weighting:
     * - Uptime: 40%
     * - Latency: 30%
     * - Version: 20%
     * - Storage: 10%
     */
    private calculateHealthScore(node: any): number {
        let score = 0;

        // Uptime score (40 points)
        if (node.uptime) {
            score += (node.uptime / 100) * 40;
        }

        // Latency score (30 points) - lower is better
        if (node.latency) {
            const latencyScore = Math.max(0, 30 - (node.latency / 100) * 30);
            score += latencyScore;
        } else {
            score += 15; // Neutral score if no latency data
        }

        // Version score (20 points) - has version = full points
        if (node.version) {
            score += 20;
        }

        // Storage score (10 points) - not full = good
        if (node.storage_capacity && node.storage_used) {
            const usagePercent = (node.storage_used / node.storage_capacity) * 100;
            score += Math.max(0, 10 - (usagePercent / 100) * 10);
        } else {
            score += 5; // Neutral score if no storage data
        }

        return Math.round(Math.max(0, Math.min(100, score)));
    }

    /**
     * Calculate network-wide statistics
     */
    async getNetworkStats() {
        const nodes = await this.getPNodes();

        const activeNodes = nodes.filter((n) => n.status === 'active');
        const inactiveNodes = nodes.filter((n) => n.status === 'inactive');

        const nodesWithLatency = nodes.filter((n) => n.latency);
        const avgLatency =
            nodesWithLatency.length > 0
                ? nodesWithLatency.reduce((sum, n) => sum + (n.latency || 0), 0) /
                nodesWithLatency.length
                : 0;

        const totalStorage = nodes.reduce(
            (sum, n) => sum + (n.storageCapacity || 0),
            0
        );
        const usedStorage = nodes.reduce((sum, n) => sum + (n.storageUsed || 0), 0);

        return {
            totalNodes: nodes.length,
            activeNodes: activeNodes.length,
            inactiveNodes: inactiveNodes.length,
            avgLatency,
            totalStorage,
            usedStorage,
            lastUpdate: Date.now(),
        };
    }
}

// Export singleton instance
export const prpcClient = new PRPCClient();
