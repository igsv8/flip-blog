export interface Blogpost {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    },
    views: number;
    userId: number;
}
