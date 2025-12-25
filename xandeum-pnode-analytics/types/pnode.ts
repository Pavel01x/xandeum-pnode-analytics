/**
 * pNode data structure based on Xandeum pRPC responses
 * 
 * NOTE: This schema is based on research from the Rust client.
 * Actual field names and types need verification from Discord/API testing.
 */

export interface PNode {
    /** Unique identifier (typically the pubkey) */
    id: string;

    /** Public key of the pNode */
    pubkey: string;

    /** Network address (IP:port or hostname) */
    address: string;

    /** Gossip network address */
    gossip: string | null;

    /** RPC endpoint URL */
    rpc: string | null;

    /** Software version */
    version: string | null;

    /** Last seen timestamp (Unix milliseconds) */
    lastSeen: number;

    /** Uptime percentage or seconds */
    uptime?: number;

    /** Storage used in bytes */
    storageUsed?: number;

    /** Total storage capacity in bytes */
    storageCapacity?: number;

    /** Response latency in milliseconds */
    latency?: number;

    /** Calculated status */
    status: 'active' | 'inactive' | 'degraded';

    /** Calculated health score (0-100) */
    healthScore?: number;
}

export interface PNodeStats {
    /** Total number of pNodes */
    totalNodes: number;

    /** Number of active pNodes */
    activeNodes: number;

    /** Number of inactive pNodes */
    inactiveNodes: number;

    /** Average latency across all nodes (ms) */
    avgLatency: number;

    /** Total storage across all nodes (bytes) */
    totalStorage: number;

    /** Used storage across all nodes (bytes) */
    usedStorage: number;

    /** Last update timestamp */
    lastUpdate: number;
}

export interface PNodesResponse {
    /** Total count of pNodes */
    total_count: number;

    /** Array of pNode objects */
    pods: PNode[];
}

export interface ApiError {
    /** Error code */
    code: string;

    /** Error message */
    message: string;

    /** Additional error details */
    details?: unknown;
}
