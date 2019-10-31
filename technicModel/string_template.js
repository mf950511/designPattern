function createDom(data){
    let div = document.createElement('div')
    div.id = data.id
    let ul = document.createElement('ul')
    let p = document.createElement('p')
    let pt = document.createTextNode(data.data.p)
    let h2 = document.createElement('h2')
    let ph = document.createTextNode(data.data.h2)
    p.appendChild(pt)
    h2.appendChild(ph)
    let liData = data.data.li
    for(let i = 0, len = liData.length; i < len; i++) {
        let li = document.createElement('li')
        let span = document.createElement('span')
        let strong = document.createElement('strong')
        let t = document.createTextNode(liData[i].strong)
        let p = document.createTextNode(liData[i].span)
        span.appendChild(p)
        strong.appendChild(t)
        li.appendChild(span)
        li.appendChild(strong)
        ul.appendChild(li)
    }

    div.appendChild(ul)
    div.appendChild(p)
    div.appendChild(h2)
    document.body.appendChild(div)
}

let data = {
    data: {
        li: [
            {
                span: '我是span',
                strong: '我是strong'
            },
            {
                span: '我是span',
                strong: '我是strong'
            },
            {
                span: '我是span',
                strong: '我是strong'
            }
        ],
        h2: '我是第二标题',
        p: '我是p标签'
    },
    id: 'containter',
}

// createDom(data)

function formatString(str, data){
    return str.replace(/\{\{(\w+)\}\}/g, function(all, key){
        return data[key] || ''
    })
}

function createDomByStringTemplate(data){
    let div = document.createElement('div')
    div.id = data.id
    let liData = data.data.li
    let divStr = [
        '<p>{{p}}</p>',
        '<h2>{{h2}}</h2>',
        '<ul>{{ul}}</ul>'
    ].join('')
    let liStr = [
        '<li>',
            '<span>{{span}}</span>',
            '<strong>{{strong}}</strong>',
        '</li>'
    ].join('')
    let ulStr = ''
    for(let i = 0, len = liData.length; i < len; i++) {
        ulStr += formatString(liStr, liData[i])
    }
    data.data.ul = ulStr
    let divStrTemplate = formatString(divStr, data.data)
    div.innerHTML = divStrTemplate
    document.body.appendChild(div)
}
// createDomByStringTemplate(data)

function view(name){
    let v = {
        code: '<pre><code>{{code}}</code></pre>',
        img: '<img src="{{src}}" alt="{{alt}}"/>'
    }
    if(Object.prototype.toString.call(name) === '[object Array]') {
        let str = ''
        for(let i = 0, len = name.length; i <len; i++) {
            str += view(name[i])
        }
        return str
    } else {
        return v[name] ? v[name] : `<${name}>{{${name}}}</${name}>`
    }
}

function createStrTemplate(data){
    let div = document.createElement('div')
    div.id = data.id
    let liData = data.data.li
    let liTpl = formatString(view('li'), {li: view(['span', 'strong'])}) 
    let str1 = view(['p', 'h2', 'ul'])
    let ulStr = ''
    for(let i = 0, len = liData.length; i < len; i++) {
        ulStr += formatString(liTpl, liData[i])
    }
    data.data.ul = ulStr
    div.innerHTML = formatString(str1, data.data)
    document.body.appendChild(div)
}
createStrTemplate(data)