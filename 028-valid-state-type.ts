interface State{
    pageText: string;
    isLoading: boolean;
    error?: string;
}

function renderPage(state: State){
    if(state.error){
        return `Error!!!`;
    } else if (state.isLoading){
        return `is Loading...`
    }
    return `<h1>${state.pageText}</h1>`
}

// isLoading: true 이면서 error exist 시 로딩중인지 에러가 발생한 상황인지 명확히 구분할 수 없음
function getUrLForPage(newPage: string){
    return new URL('url')
}

async function changePage(state: State, newPage: string){
    state.isLoading = true;

    try {
        const response = await fetch(getUrLForPage(newPage))
        if(!response.ok){
            throw new Error()
        }
        const text = await response.text();
        state.isLoading = false;
        state.pageText = text;

    } catch (e) {
        state.error = '' + e;
    }
}



// 개선하기: state 라는 하나의 상태 값을 기준으로 분기를 쳐서 상태를 관리한다.

interface RequestPending {
    state: 'pending';
}

interface  RequestError {
    state: 'error';
    error: string;
}

interface  RequestSuccess {
    state: 'ok';
    pageText: string;
}

type RequestState = RequestPending| RequestError| RequestSuccess // 가능한 상태를 유니언 타입으로 관리
interface State2 {
    currentPage: string;
    request: { [nextPage: string]: RequestState } // 다음 페이지가 불러와진 상태인지 state 와 각 상태에 대한 메시지로 관리
}

function renderPage2(state:State2){
    const {currentPage} = state;
    const requestState = state.request[currentPage]

    switch (requestState.state){
        case "pending":
            return `Loading ${currentPage}...`
        case "error":
            return `Error!!!`
        case "ok":
            return `<h1>${currentPage}</h1>`
    }
}

async function changePage2 (state: State2, newPage: string) {
    state.request[newPage] = {state: 'pending'};
    state.currentPage = newPage

    try{
        const response = await fetch(getUrLForPage(newPage))
        if(!response.ok){
            throw new Error()
        }
        const pageText = await response.text();
        state.request[newPage] = {state:'ok', pageText};
    } catch (e) {
        state.request[newPage] = {state: 'error', error: e + ''}
    }
}
