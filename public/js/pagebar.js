let articlesCount, pageCount, currentPage;


getCount();
totalPage(articlesCount);
getCurrentPage();
generatePagination();

function getCount() {
    let countDiv = document.querySelector('.count');
    articlesCount = countDiv.innerHTML;
    countDiv.remove();
}

function totalPage(count) {
    pageCount = Math.ceil(count / 10);
}

function getCurrentPage() {
    let currentPageDiv = document.querySelector('.currentPage');
    currentPage = parseInt(currentPageDiv.innerHTML);
}

function generatePagination() {
    let ul = document.querySelector('.pagination');
    createPrevious(ul);
    createPage(ul);
    createNext(ul);
}

function createLi(href, content) {
    let li = document.createElement('li');
    li.classList.add("page-item");
    let a = document.createElement('a');
    a.classList.add("page-link");
    a.href = href;
    a.innerHTML = content;
    li.appendChild(a);
    return li;
}

function createPrevious(ul) {
    let previous, href, content;
    content = "previous";
    href = `/page/${currentPage - 1}`;
    previous = createLi(href, content);
    if (currentPage == 1) {
        previous.classList.add('disabled');
    }
    ul.appendChild(previous);
}

function createNext(ul) {
    let next, href, content;
    content = "next";
    href = `/page/${currentPage + 1}`;
    next = createLi(href, content);
    if (currentPage == pageCount) {
        next.classList.add('disabled');
    }
    ul.appendChild(next);
}

function createPage(ul) {
    let page, href, content, startPoint, endPoint;

    if (pageCount <= 10 || currentPage <= 5) {
        startPoint = 1;
        endPoint = Math.min(pageCount,10);
    } else if (pageCount - currentPage <= 5) {
        startPoint = pageCount - 9;
        endPoint = pageCount;
    } else {
        startPoint = currentPage - 4;
        endPoint = currentPage + 5;
    }

    for (let i = startPoint; i <= endPoint; i++) {
        content = `${i}`;
        href = `/page/${i}`;
        page = createLi(href, content);
        if (i == currentPage) {
            page.classList.add("active");
        }
        ul.appendChild(page);
    }



}