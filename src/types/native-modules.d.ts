declare module 'react-native' {
    interface NativeModulesStatic {
        CallLogModule: {
            getCallLogs(limit: number): Promise<Array<{
                id: string;
                phoneNumber: string;
                name: string | null;
                duration: number;
                timestamp: number;
                type: string;
            }>>;
        };
    }
}
