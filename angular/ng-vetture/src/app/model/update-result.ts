export interface UpdateResult {
    esito: {
        marca: {
            inserisci: boolean,
            aggiorna: boolean,
            rimuovi: boolean
        },
        modello: {
            inserisci: boolean,
            aggiorna: boolean,
            rimuovi: boolean
        }
    };
}
