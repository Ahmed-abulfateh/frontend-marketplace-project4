import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getMarketplaceRuntimeInfo } from '../lib/marketplaceApi';
function DeploymentPage() {
    const [deploymentStatus, setDeploymentStatus] = useState({
        status: 'connecting',
        message: 'Checking deployment status...',
        mongoDBStatus: 'Checking...',
        apiHealth: 'Checking...',
        apiEndpoint: getMarketplaceRuntimeInfo().apiBase || 'Local demo mode',
        timestamp: new Date().toLocaleString(),
    });
    useEffect(() => {
        let isMounted = true;
        const { apiBase } = getMarketplaceRuntimeInfo();
        const onPagesHost = window.location.hostname === 'ahmed-abulfateh.github.io';
        const markDemoMode = () => {
            if (!isMounted) {
                return;
            }
            setDeploymentStatus({
                status: 'connected',
                message: 'Running in demo mode with local marketplace data.',
                mongoDBStatus: 'Not required in demo mode',
                apiHealth: 'Local demo adapter',
                apiEndpoint: apiBase || 'Local demo mode',
                timestamp: new Date().toLocaleString(),
            });
        };
        if (!apiBase) {
            markDemoMode();
            return () => {
                isMounted = false;
            };
        }
        const checkDeploymentStatus = async () => {
            try {
                const healthResponse = await axios.get(`${apiBase}/api/health`, {
                    timeout: 5000,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    validateStatus: () => true,
                });
                if (!isMounted) {
                    return;
                }
                if (healthResponse.status >= 200 && healthResponse.status < 300) {
                    setDeploymentStatus({
                        status: 'connected',
                        message: 'Deployment is operational',
                        mongoDBStatus: 'Connected',
                        apiHealth: 'Healthy',
                        apiEndpoint: apiBase,
                        timestamp: new Date().toLocaleString(),
                    });
                }
                else if (onPagesHost) {
                    markDemoMode();
                }
                else {
                    setDeploymentStatus({
                        status: 'error',
                        message: `API responded with status ${healthResponse.status}`,
                        mongoDBStatus: 'Unknown',
                        apiHealth: 'Unhealthy',
                        apiEndpoint: apiBase,
                        timestamp: new Date().toLocaleString(),
                    });
                }
            }
            catch (error) {
                if (!isMounted) {
                    return;
                }
                if (onPagesHost) {
                    markDemoMode();
                }
                else {
                    const errorMsg = axios.isAxiosError(error)
                        ? error.code === 'ECONNABORTED'
                            ? 'Request timed out'
                            : error.message
                        : error instanceof Error
                            ? error.message
                            : 'Unknown error';
                    setDeploymentStatus({
                        status: 'error',
                        message: `Failed to connect to API: ${errorMsg}`,
                        mongoDBStatus: 'Unknown',
                        apiHealth: 'Unreachable',
                        apiEndpoint: apiBase,
                        timestamp: new Date().toLocaleString(),
                    });
                }
            }
        };
        void checkDeploymentStatus();
        const interval = setInterval(() => {
            void checkDeploymentStatus();
        }, 10000);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);
    return (_jsxs("main", { style: { padding: '2rem', maxWidth: '800px', margin: '0 auto' }, children: [_jsx("h1", { children: "Deployment Status" }), _jsxs("section", { style: {
                    marginTop: '2rem',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    backgroundColor: deploymentStatus.status === 'connected'
                        ? '#d4edda'
                        : deploymentStatus.status === 'error'
                            ? '#f8d7da'
                            : '#e2e3e5',
                    borderLeft: `4px solid ${deploymentStatus.status === 'connected'
                        ? '#28a745'
                        : deploymentStatus.status === 'error'
                            ? '#dc3545'
                            : '#6c757d'}`,
                }, children: [_jsxs("h2", { style: { margin: '0 0 1rem 0', fontSize: '1.5rem' }, children: [deploymentStatus.status === 'connected' ? '✓' : deploymentStatus.status === 'error' ? '✕' : '⟳', " Overall Status"] }), _jsx("p", { style: { fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '500' }, children: deploymentStatus.message }), _jsxs("p", { style: { fontSize: '0.9rem', color: '#666' }, children: ["Last checked: ", deploymentStatus.timestamp] })] }), _jsxs("section", { style: { marginTop: '2rem' }, children: [_jsx("h2", { style: { fontSize: '1.3rem', marginBottom: '1rem' }, children: "Service Details" }), _jsxs("div", { style: {
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem',
                        }, children: [_jsxs("div", { style: { padding: '1rem', border: '1px solid #ddd', borderRadius: '6px' }, children: [_jsx("h3", { style: { margin: '0 0 0.5rem 0', fontSize: '1rem' }, children: "MongoDB" }), _jsx("p", { style: {
                                            margin: 0,
                                            padding: '0.5rem 0',
                                            color: deploymentStatus.mongoDBStatus === 'Connected' ? '#28a745' : '#dc3545',
                                            fontWeight: '500',
                                        }, children: deploymentStatus.mongoDBStatus })] }), _jsxs("div", { style: { padding: '1rem', border: '1px solid #ddd', borderRadius: '6px' }, children: [_jsx("h3", { style: { margin: '0 0 0.5rem 0', fontSize: '1rem' }, children: "API Server" }), _jsx("p", { style: {
                                            margin: 0,
                                            padding: '0.5rem 0',
                                            color: deploymentStatus.apiHealth === 'Healthy' ? '#28a745' : '#dc3545',
                                            fontWeight: '500',
                                        }, children: deploymentStatus.apiHealth })] })] })] }), _jsxs("section", { style: { marginTop: '2rem' }, children: [_jsx("h2", { style: { fontSize: '1.3rem', marginBottom: '1rem' }, children: "Configuration" }), _jsxs("div", { style: { padding: '1rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#f9f9f9' }, children: [_jsxs("p", { style: { margin: '0.5rem 0', fontSize: '0.95rem' }, children: [_jsx("strong", { children: "API Endpoint:" }), " ", _jsx("code", { children: deploymentStatus.apiEndpoint })] }), _jsxs("p", { style: { margin: '0.5rem 0', fontSize: '0.95rem' }, children: [_jsx("strong", { children: "Database:" }), " MongoDB Atlas when remote mode is available"] }), _jsxs("p", { style: { margin: '0.5rem 0', fontSize: '0.95rem' }, children: [_jsx("strong", { children: "Status Page URL:" }), " ", _jsx("code", { children: "/deployment" })] })] })] })] }));
}
export default DeploymentPage;
