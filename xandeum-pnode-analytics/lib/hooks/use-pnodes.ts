import { useQuery } from '@tanstack/react-query';
import { prpcClient } from '@/lib/api/prpc-client';
import { PNode, PNodeStats } from '@/types/pnode';

/**
 * Hook to fetch all pNodes with real-time polling
 */
export function usePNodes() {
    return useQuery<PNode[]>({
        queryKey: ['pnodes'],
        queryFn: () => prpcClient.getPNodes(),
        refetchInterval: 30000,
        staleTime: 15000,
    });
}

/**
 * Hook to fetch a specific pNode's details
 */
export function usePNode(pubkey: string) {
    const { data: nodes, ...rest } = usePNodes();
    const node = nodes?.find((n: PNode) => n.pubkey === pubkey);
    return { ...rest, data: node };
}

/**
 * Hook to fetch system stats for the connected node
 */
export function useNodeStats() {
    return useQuery<PNodeStats>({
        queryKey: ['node-stats'],
        queryFn: () => prpcClient.getNodeStats(),
        refetchInterval: 10000,
        staleTime: 5000,
    });
}
