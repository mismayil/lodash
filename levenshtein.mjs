import isNil from './isNil'
import times from './times'
import constant from './constant'
import map from './map'
import forEach from './forEach'
import min from './min'
import toLower from './toLower'

const levenshtein = function(source, target, caseInsensitive=false) {
    if (isNil(source) || isNil(target)) return null

    let m = source.length
    let n = target.length

    if (m === 0) return n
    if (n === 0) return m

    let distances = times(m+1, constant(times(n+1, constant(0))))

    distances[0] = map(distances[0], (d, i) => i)
    forEach(distances, (d, i) => {
        d[0] = i
    })

    for (let i = 1; i < m+1; i++) {
        for (let j = 1; j < n+1; j++) {
            let match = caseInsensitive ? toLower(source[i-1]) === toLower(target[j-1]) : source[i-1] === target[j-1]
            let cost =  match ? 0 : 1
            distances[i][j] = min(distances[i-1][j] + 1, distances[i][j-1] + 1, distances[i-1][j-1] + cost)
        }
    }

    return distances[m][n]
}

export default levenshtein
