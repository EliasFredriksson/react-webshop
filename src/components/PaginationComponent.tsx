import "../scss/components/Pagination.scss";

interface IPaginationComponent {
    currentPage: number;
    setPage(pageNumber: number): void;
    foundCount: number;
}

export default function PaginationComponent(props: IPaginationComponent) {
    const amountOfPages = Math.ceil(props.foundCount / 10);
    const visibleTabs = Math.min(5, amountOfPages);
    let showMin = true;
    let showMax = true;
    let activeTabs: number[] = [];
    let offset = 0;
    for (let index = 0; index < visibleTabs; index++) {
        const tempPage =
            props.currentPage - Math.floor(visibleTabs / 2) + index;

        if (tempPage > amountOfPages) offset--;
        if (tempPage < 1) offset++;
        activeTabs.push(tempPage);
    }
    activeTabs = activeTabs.map((n) => {
        return n + offset;
    });
    if (offset > 0 || amountOfPages === visibleTabs) showMin = false;
    if (offset < 0 || amountOfPages === visibleTabs) showMax = false;

    let html = (
        <>
            <span
                className="__arrow"
                onClick={() => {
                    handleArrow(-1);
                }}
            >
                ❰
            </span>

            {getBefore()}

            {activeTabs.map((n, i) => {
                {
                    if (n === props.currentPage)
                        return (
                            <span
                                key={i}
                                className="__selectable current-page"
                                onClick={() => {
                                    handleClick(n);
                                }}
                            >
                                {n}
                            </span>
                        );
                    else
                        return (
                            <span
                                className="__selectable"
                                key={i}
                                onClick={() => {
                                    handleClick(n);
                                }}
                            >
                                {n}
                            </span>
                        );
                }
            })}
            {getAfter()}

            <span
                className="__arrow"
                onClick={() => {
                    handleArrow(1);
                }}
            >
                ❱
            </span>
        </>
    );

    function handleArrow(pageChange: number) {
        const newPage = props.currentPage + pageChange;
        if (newPage >= 1 && newPage <= amountOfPages) {
            props.setPage(newPage);
        }
    }
    function handleClick(pageNumber: number) {
        // console.log(pageNumber);
        props.setPage(pageNumber);
        window.scrollTo(0, 0);
    }

    function getBefore() {
        if (showMin) {
            return (
                <>
                    <span
                        className="__selectable"
                        onClick={() => {
                            handleClick(1);
                        }}
                    >
                        1
                    </span>
                    <span>...</span>
                </>
            );
        }
    }
    function getAfter() {
        if (showMax) {
            return (
                <>
                    <span>...</span>
                    <span
                        className="__selectable"
                        onClick={() => {
                            handleClick(amountOfPages);
                        }}
                    >
                        {amountOfPages}
                    </span>
                </>
            );
        }
    }

    return <div className="pagination">{html}</div>;
}
