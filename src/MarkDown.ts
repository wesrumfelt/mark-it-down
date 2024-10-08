export class MarkDown {
    items: MarkDownItem[]
    unformattedItems: string[]
    results: string[]

    constructor() {
        this.items = []
        this.register()
        this.unformattedItems = []
        this.results = []
    }

    /**
     * Registers initial supported list of markdown handlers
     */
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

    /**
     * Compiles a running list of back-to-back unformatted lines wrapped in <p></p> tags
     *
     * @return {String}        HTML representation
     */
    substituteUnformatted(): string {
        if (this.unformattedItems.length == 0) {
            return
        }
        const items = this.unformattedItems.reduce((val, item) => {
            val = val + item + "\n"
            return val
        }, '')
        const val = `<p>${items.slice(0, -1)}</p>`
        this.unformattedItems = []
        this.results.push(val)
    }

    /**
     * Handles HTML rendering for a given markdown string line
     *
     * @param  {String} line   Markdown-formatted line
     * @return {String}        HTML representation
     */
    renderHTML(line: string): string {
        if (line === '') {
            this.substituteUnformatted()
            return
        }
        let isUnformatted: boolean = true
        this.items.forEach((item) => {
            if (item.test(line)) {
                line = line.replace(new RegExp(item.regex), item.html)
                if (!item.isUnformatted) {
                    isUnformatted = false
                }
            }
        })
        if (isUnformatted) {
            this.unformattedItems.push(line)
        } else {
            this.substituteUnformatted()
            this.results.push(line)
        }
    }

    /**
     * Handles line-by-line conversion for a given markdown string
     *
     * @param  {String} markdown   Markdown-formatted string
     * @return {String}            HTML representation
     */
    convert(markdown: string): string {
        if (typeof markdown !== 'string') {
            throw new Error('Input is not a string!');
        }
        markdown.split('\n').forEach((line) => this.renderHTML(line))
        if (this.unformattedItems.length > 0) {
            this.substituteUnformatted()
        }
        return this.results.reduce((val, item) => {
            val = val + item + "\n"
            return val
        }, '')
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