import { createContext } from 'react';

const JobPostsContext = createContext<any>({
    jobPosts: [],
    setJobPosts: () => {}
});

export default JobPostsContext;