const publicEnvironmentVariables = ["MAGIC_PUBLISHABLE_KEY"] as const;

type PublicEnvironmentVariable = (typeof publicEnvironmentVariables)[number];
type EnvironmentVariable = `NEXT_PUBLIC_${PublicEnvironmentVariable}`;

function env<Var extends EnvironmentVariable>(envVar: Var): string {
  const val = process.env[envVar];

  if (!val) {
    throw new Error(`environment variable not set: ${envVar}`);
  }

  return val;
}

function publicEnv<Var extends PublicEnvironmentVariable>(envVar: Var): string {
  return env(`NEXT_PUBLIC_${envVar}`);
}

export default Object.fromEntries(
  publicEnvironmentVariables.map((envVar) => [envVar, publicEnv(envVar)])
);
