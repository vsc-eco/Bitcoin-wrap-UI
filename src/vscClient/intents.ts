// ===== 2 WAYS TO USE =====
//
// PROVIDING ALL THE INTENTS UPFRONT:
//
// const intents: CompletedIntents = IntentsBuilder.fromIntents([
//     [TransactionIntent['hive.allow_transfer'], { token: 'HIVE', limit: 1 }],
//   ]),
//
// BUILDING INTENTS 1 BY 1:
//
// const builder = new IntentsBuilder()
// builder.addIntent(TransactionIntent['hive.allow_transfer'], { token: 'HIVE', limit: 1 })
// const intents = builder.build()
//
// ===== USAGE =====

// our valid intent base types
export enum TransactionIntent {
  'money.spend' = 'money.spend',
  'hive.allow_transfer' = 'hive.allow_transfer',
}

export type CompletedIntents = string[] // list of string intents

export type IntentQueryParams = Record<string, string | number>

export interface TransactionIntentBuilder {
  addIntent: (intent: TransactionIntent, queryData?: IntentQueryParams) => void
  build: () => string[]
}

export class IntentsBuilder implements TransactionIntentBuilder {
  private intents: string[] = [] // store serialized intents

  constructor(initialIntents?: [TransactionIntent, IntentQueryParams?][]) {
    if (initialIntents) {
      for (const [intent, queryData] of initialIntents) {
        this.addIntent(intent, queryData)
      }
    }
  }

  // add an intent to the intents array
  addIntent(intent: TransactionIntent, queryData?: IntentQueryParams): void {
    if (!intent) {
      throw new Error(`invalid TransactionIntent: intent is null or undefined`)
    }

    const queryString = queryData
      ? '?' +
        Object.entries(queryData)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
          )
          .join('&')
      : ''

    // store the serialized intent (intent + queryString)
    const serializedIntent = `${intent}${queryString}`
    this.intents.push(serializedIntent)
  }

  // build the intents array
  build(): string[] {
    return this.intents // return our only serialized intents
  }

  // static factory method for predefined intents (opposed to needing to "build" them)
  static fromIntents(
    predefinedIntents: [TransactionIntent, IntentQueryParams?][],
  ): string[] {
    const builder = new IntentsBuilder(predefinedIntents)
    return builder.build()
  }
}
