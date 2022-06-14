import { Courses } from "./course.interface";

export interface Student {
    id: number;
    name: string;
    lastname: string;
    cursos?: Courses[];
}