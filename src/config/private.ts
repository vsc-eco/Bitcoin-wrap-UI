const privateEnvironmentVariables = [] as const

type PrivateEnvironmentVariable = (typeof privateEnvironmentVariables)[number]
type EnvironmentVariable = PrivateEnvironmentVariable

function env<Var extends EnvironmentVariable>(envVar: Var): string {
  const val = process.env[envVar]

  if (!val) {
    throw new Error(`environment variable not set: ${envVar}`)
  }

  return val
}

function privateEnv<Var extends PrivateEnvironmentVariable>(
  envVar: Var,
): string {
  return env(envVar)
}

export default Object.fromEntries(
  privateEnvironmentVariables.map(envVar => [envVar, privateEnv(envVar)]),
)
