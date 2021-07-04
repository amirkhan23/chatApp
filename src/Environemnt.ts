export enum Environment {
    LOCAL = "local",
    TESTING = "testing",
    STAGING = "staging",
    PRODUCTION = "production"
};

function getEnv(): Environment {
    let env = process.env.NODE_ENV;
    console.log(env);
    if (!env) {
        env = '';
    }
    env = env.toLowerCase();

    const isValid = Object.values(Environment).indexOf(env as any) >= 0;

    if (!isValid) {
        throw new Error(`Environment Missing`);
    }

    return env as Environment;
}

export const ENV: Environment = getEnv();