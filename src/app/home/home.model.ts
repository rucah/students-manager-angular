
export class Pagination {
    page: number;
    pageSize: number;
    length: number;

    constructor() {
        this.page = 0;
        this.pageSize = 0;
        this.length = 0;
    }
}

export interface Student {
    id: number,
    name: string,
    citizenNumber: string,
    nationality: string,
    contacts: string,
    responsible: string,
    musicality: number,
    comments: string,
    cluster: string,
}

export class StudentFilter extends Pagination {
    cluster: number;
    musicality: number;

    constructor(_class: number = 1, musicality: number = null) {
        super();
        this.cluster = _class;
        this.musicality = musicality;
    }
}

export class StudentsList extends Pagination {
    data: Student [];

    constructor () {
        super();
        this.data = []
    }
}
