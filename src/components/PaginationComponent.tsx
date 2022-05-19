import { useState } from "react";
import "../scss/components/Pagination.scss";

interface IPaginationComponent {
    currentPage: number;
    setPage: Function;
    foundCount: number;
}

export default function PaginationComponent(props: IPaginationComponent) {
    const amountOfPages = Math.ceil(props.foundCount / 10);
    const visibleTabs = 5;
    let showMin = true;
    let showMax = true;

    // for (let index = currentPage; index < currentPage + visibleTabs; index++) {}
    // console.log("CURRENT PAGE: ", currentPage, "\n\n");
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
    if (offset > 0) {
        showMin = false;
    }

    if (offset < 0) {
        showMax = false;
    }

    let html = (
        <>
            <span
                className="__selectable"
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
                className="__selectable"
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
        console.log(pageNumber);
        props.setPage(pageNumber);
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
