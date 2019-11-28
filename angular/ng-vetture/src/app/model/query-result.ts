import { Marca } from './brand';
import { Modello } from './model';

export interface QueryResult {
    esito: {
        marca: Array<Marca>,
        modello: Array<Modello>
    };
}
