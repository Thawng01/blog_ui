export interface Category {
    id: string;
    name: string;
    created_at: string;
    updated_at: string
}
export interface Blog {
    id: number;
    title: string;
    description: string;
    image: string;
    view_count: string;
    user_id: string
    user: {
        name: string;
        email: string;
    };
    category: Category
    created_at: string;
}



export interface User {
    id: string;
    name: string;
    email: string;
    email_verified_at: null | string;
    created_at: string;
    updated_at: string
}

export interface AuthUser {
    status: string;
    token: string;
    user: User
}

export interface PaginationLink {
    url: string | null,
    label: string;
    active?: boolean
}

export interface PaginationType {

    totalPages: number;
    per_page: number,
    links: PaginationLink[]
}

