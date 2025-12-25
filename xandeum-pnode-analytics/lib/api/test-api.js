/**
 * Test script to verify real-time pRPC data fetching using native fetch (Node 25+)
 */

async function testPRPC() {
    console.log('--- Xandeum pRPC Live Test ---');
    const endpoint = 'http://173.212.220.65:6000/rpc';

    try {
        console.log(`Connecting to: ${endpoint}`);

        // Helper for JSON-RPC calls
        const call = async (method, params = []) => {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jsonrpc: '2.0', id: Date.now(), method, params })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error.message);
            return data.result;
        };

        // 1. Test get-version
        const version = await call('get-version');
        console.log('✅ get-version:', JSON.stringify(version));

        // 2. Test get-stats
        const stats = await call('get-stats');
        console.log('✅ get-stats SUCCESS');
        console.log('   Uptime:', stats.uptime, 's');
        console.log('   CPU:', stats.cpu_percent.toFixed(2), '%');

        // 3. Test get-pods-with-stats
        const podsData = await call('get-pods-with-stats');
        console.log(`✅ get-pods-with-stats SUCCESS: Found ${podsData.total_count} nodes`);

        const firstNode = podsData.pods[0];
        console.log('   Sample Node Result:');
        console.log('   - Pubkey:', firstNode.pubkey);
        console.log('   - Uptime:', firstNode.uptime, 's');
        console.log('   - Version:', firstNode.version);

        console.log('\n--- Test Passed! Backend unblocked. ---');
    } catch (error) {
        console.error('❌ Test Failed:', error.message);
    }
}

testPRPC();
