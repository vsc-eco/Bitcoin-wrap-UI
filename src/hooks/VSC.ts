import { useState } from "react"


const API_URL = 'https://api.vsc.eco'

export function useCreateTx() {

    const [pendingTransactions, setPendingTransactions] =  useState()

    const transfer = async (args) => {

    }

    return {
        transfer
    }
}