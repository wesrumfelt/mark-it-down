export class MarkDown {
    items: MarkDownItem[]
    unformattedItems: string[]

    constructor() {
        this.items = []
        this.register()
        this.unformattedItems = []
    }

    register() {
        // h1
        this.items.push(new MarkDownItem(/^#{1}\s(.*)/i, '<h1>$1</h1>', false))
        // h2
        this.items.push(new MarkDownItem(/^#{2}\s(.*)/i, '<h2>$1</h2>', false))
        // h3
        this.items.push(new MarkDownItem(/^#{3}\s(.*)/i, '<h3>$1</h3>', false))
        // h4
        this.items.push(new MarkDownItem(/^#{4}\s(.*)/i, '<h4>$1</h4>', false))
        // h5
        this.items.push(new MarkDownItem(/^#{5}\s(.*)/i, '<h5>$1</h5>', false))
        // h6
        this.items.push(new MarkDownItem(/^#{6}\s(.*)/i, '<h6>$1</h6>', false))
        // link
        this.items.push(new MarkDownItem(/\[([^\n]+)\]\(([^\n]+)\)/g, '<a href="$2">$1</a>', true))
    }

    substituteHTML(val: string): string {
        if (val === '') {
            return val
        }
        let unformatted = true
        this.items.forEach((item) => {
            if(item.test(val) && !item.isUnformatted) {
                unformatted = false
            }
            val = val.replace(new RegExp(item.regex), item.html)
        })
        if (unformatted) {
            this.unformattedItems.push(val)
            val = `<p>${val}</p>`
        } else {

        }
        return val
    }
}

export class MarkDownItem {
    regex: RegExp
    html: string
    isUnformatted: boolean

    constructor(regex: RegExp, html: string, isUnformatted: boolean) {
        this.regex = regex
        this.html = html
        this.isUnformatted = isUnformatted
    }

    test(val: string): boolean {
        return new RegExp(this.regex).test(val)
    }
}