export const boardFetch = (diff) => {
    return (dispatch) => {
        let url = `https://sugoku.herokuapp.com/board?difficulty=${diff}`
        fetch(url)
            .then(response => {return response.json()})
            .then(data => {
                dispatch({
                    type: 'BOARD_FETCH',
                    payload: data
                })
            })
            .catch(error => console.log(error))
    }
}

export const sugokuValidate = (data) => {
    return (dispatch) => {
        let url = `https://sugoku.herokuapp.com/validate`
        fetch(url, {
            method: 'POST',
            body: encodeParams({board:data}),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => {return response.json()})
            .then(validateData => {
                dispatch({
                    type: 'BOARD_VALIDATE',
                    payload: validateData
                })
            })
            .catch(error => console.log(error))
    }
}

export const sugokuSolve = (data) => {
    return (dispatch) => {
        let url = `https://sugoku.herokuapp.com/solve`
        fetch(url, {
            method: 'POST',
            body: encodeParams({board:[data]}),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => {return response.json()})
            .then(solveData => {
                dispatch({
                    type: 'BOARD_SOLVE',
                    payload: solveData
                })
            })
            .catch(error => console.log(error))
    }
}

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) =>
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');