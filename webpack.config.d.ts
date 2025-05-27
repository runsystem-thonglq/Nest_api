export const target: string;
export namespace module {
    const rules: {
        test: RegExp;
        exclude: RegExp;
        use: {
            loader: string;
            options: {
                transpileOnly: boolean;
                configFile: string;
            };
        }[];
    }[];
}
export namespace resolve {
    const extensions: string[];
    const plugins: any[];
}
export const mode: string;
