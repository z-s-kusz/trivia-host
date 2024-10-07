// literally only here to hack in global page transitions
export const load = ({ url }) => {
    const { pathname } = url;

    return {
        pathname,
    };
};
