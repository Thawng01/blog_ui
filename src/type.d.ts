export interface Blog {
    id: number;
    title: string;
    description: string;
    user: {
        name: string;
        email: string;
    };
    created_at: string;
}