export const Max_Character: number = 150;

export interface feedback {
    id: number;
    company: string | undefined;
    badgeLetter: string;
    upvoteCount: number;
    daysAgo: number;
    text: string
    UpvoteAdd : (id:number, event:React.MouseEvent<HTMLButtonElement,MouseEvent>) => void
}