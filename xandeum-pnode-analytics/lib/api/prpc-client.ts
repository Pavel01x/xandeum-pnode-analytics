/**
 * pRPC API Client for Xandeum pNode Network
 */

import axios, { AxiosInstance } from 'axios';
import { PNode, PNodesResponse, ApiError, PNodeStats } from '@/types/pnode';

const PRPC_ENDPOINT = '/api/rpc';

export class PRPCClient {
    private client: AxiosInstance;
    private endpoint: string;

    constructor(endpoint: string = PRPC_ENDPOINT) {
        this.endpoint = endpoint;

        this.client = axios.create({
            baseURL: endpoint,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

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

    private async call<T>(method: string, params: any[] = []): Promise<T> {
        const response = await this.client.post('/', {
            jsonrpc: '2.0',
            id: Date.now(),
            method,
            params,
        });

        if (response.data.error) {
            throw response.data.error;
        }

        return response.data.result;
    }

    /**
     * Fetch all pNodes from the network with stats
     */
    async getPNodes(): Promise<PNode[]> {
        try {
            const data = await this.call<PNodesResponse>('get-pods-with-stats');
            return this.transformNodes(data.pods);
        } catch (error) {
            console.error('[pRPC Error] Failed to fetch pNodes:', error);
            throw error;
        }
    }

    /**
     * Fetch system stats from the connected node
     */
    async getNodeStats(): Promise<PNodeStats> {
        return this.call<PNodeStats>('get-stats');
    }

    /**
     * Transform raw API response to typed PNode format
     */
    private transformNodes(nodes: any[]): PNode[] {
        return nodes.map((node) => ({
            ...node,
            status: this.calculateStatus(node),
            healthScore: this.calculateHealthScore(node),
        }));
    }

    private calculateStatus(node: any): 'active' | 'inactive' | 'degraded' {
        const now = Math.floor(Date.now() / 1000);
        const timeSinceLastSeen = now - node.last_seen_timestamp;

        if (timeSinceLastSeen > 3600) return 'inactive'; // Not seen in 1 hour
        if (node.uptime < 3600) return 'degraded'; // Just started or issues
        return 'active';
    }

    /**
     * Calculate health score (0-100)
     */
    private calculateHealthScore(node: any): number {
        let score = 0;

        // Uptime score (40 points)
        if (node.uptime > 86400) score += 40; // > 1 day
        else if (node.uptime > 3600) score += 20;

        // Storage score (30 points)
        if (node.storage_usage_percent < 80) score += 30;
        else if (node.storage_usage_percent < 95) score += 15;

        // Version score (30 points)
        if (node.version && node.version.includes('0.8')) score += 30;
        else if (node.version && node.version.includes('0.7')) score += 15;

        return score;
    }
}

export const prpcClient = new PRPCClient();
