let articlesCount,pageCount,currentPage;

function getCount() {
    let countDiv = document.querySelector('.count');
    articlesCount = countDiv.innerHTML;
    countDiv.remove();
}

getCount();


function totalPage (count) {
    pageCount = Math.ceil(count / 10);
}

totalPage(articlesCount);

function getCurrentPage() {
    let currentPageDiv = document.querySelector('.currentPage');
    currentPage = parseInt(currentPageDiv.innerHTML);
    console.log(currentPage);
}

getCurrentPage();
generatePagination();

function generatePagination () {
    let ul = document.querySelector('.pagination');
    createPrevious(ul);
    createNext(ul);
}

function createLi (href,content) {
    let li = document.createElement('li');
    li.classList.add("page-item");
    let a = document.createElement('a');
    a.classList.add("page-link");
    a.href = href;
    a.innerHTML = content;
    li.appendChild(a);
    return li;
}

function createPrevious (ul) {
    let previous,href,content;
    content = "previous";
    href = `/page/${currentPage - 1}`;
    previous = createLi(href, content);
    if (currentPage == 1) {
        previous.classList.add('disabled');
    }
    ul.appendChild(previous);
}

function createNext (ul) {
    let next,href,content;
    content = "next";
    href = `/page/${currentPage + 1}`;
    next = createLi(href, content);
    if (currentPage == totalPage) {
        previous.classList.add('disabled');
    }
    ul.appendChild(next);
}