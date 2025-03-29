import type { Status } from '../../types/Status';
import { StatusRepository } from '../Repository/StatusRepository'
export class GetStatuses {
    
    private statusRepository: StatusRepository;

    constructor(){
        this.statusRepository = new StatusRepository();
    }

    getStatuses(): Status[] {
        return this.statusRepository.getStatuses();
    }
}