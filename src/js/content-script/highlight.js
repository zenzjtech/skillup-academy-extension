// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header
function Highlight(id, tag)
{
    
    // private variables
    var targetNode = document.getElementById(id) || document.body;
    var hiliteTag = tag || "a";
    var skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN|A)$");
    var entityTypes = [
        {
            type: "topic",
            color: "#ffff66"
        },
        {
            type: "organisation",
            color: "#fd6f48"
        },
        {
            type: "person",
            color: "#fbae4f"
        }];
    //var wordColor = []; // DJ REMOVED AS NO NEED TO TRACK COLORS
    //var colorIdx = 0; // DJ REMOVED AS NO NEED TO TRACK COLORS
    var matchRegExp = "";
    var openLeft = false;
    var openRight = false;
    
    // characters to strip from start and end of the input string
    var endRegExp = new RegExp('^[^\\w]+|[^\\w]+$', "g");
    
    // characters used to break up the input string into words
    var breakRegExp = new RegExp('[^\\w\'-]+', "g");
    
    this.setEndRegExp = function(regex) {
        endRegExp = regex;
        return endRegExp;
    };
    
    this.setBreakRegExp = function(regex) {
        breakRegExp = regex;
        return breakRegExp;
    };
    
    this.setMatchType = function(type)
    {
        switch(type)
        {
            case "left":
                this.openLeft = false;
                this.openRight = true;
                break;
            
            case "right":
                this.openLeft = true;
                this.openRight = false;
                break;
            
            case "open":
                this.openLeft = this.openRight = true;
                break;
            
            default:
                this.openLeft = this.openRight = false;
            
        }
    };
    
    this.setRegex = function(input)
    {
        input = input.replace(endRegExp, "");
        //input = input.replace(breakRegExp, "|"); //DJ REMOVED TO TEST
        input = input.replace(/^\||\|$/g, "");
        if(input) {
            var re = "(" + input + ")";
            if(!this.openLeft) {
                re = "\\b" + re;
            }
            if(!this.openRight) {
                re = re + "\\b";
            }
            matchRegExp = new RegExp(re, "i");
            return matchRegExp;
        }
        return false;
    };
    
    this.getRegex = function()
    {
        var retval = matchRegExp.toString();
        retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
        retval = retval.replace(/\|/g, " ");
        return retval;
    };
    
    // recursively apply word highlighting
    this.hiliteWords = function(node, e)
    {
        if(node === undefined || !node) return;
        if(!matchRegExp) return;
        if(skipTags.test(node.nodeName)) return;
        
        if(node.hasChildNodes()) {
            for(var i=0; i < node.childNodes.length; i++)
                this.hiliteWords(node.childNodes[i], e);
        }
        if(node.nodeType == 3) { // NODE_TEXT
            if((nv = node.nodeValue) && (regs = matchRegExp.exec(nv))) {
                /*if(!wordColor[regs[0].toLowerCase()]) {
                    wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
                }*/ // DJ COMMENTED OUT AS NO NEED TO TRACK COLORS
                
                var match = document.createElement(hiliteTag);
                match.href = `https://www.skillup-academy.com/skill/${regs[0]}`
                match.appendChild(document.createTextNode(regs[0]));
                //match.style.backgroundColor = entityTypes[e].color;//wordColor[regs[0].toLowerCase()];
                //match.style.color = "#000"; // DJ REMOVED TO REPLACE WITH CLASS
                match.classList.add(entityTypes[e].type);
                match.classList.add("entity");
                
                var after = node.splitText(regs.index);
                after.nodeValue = after.nodeValue.substring(regs[0].length);
                node.parentNode.insertBefore(match, after);
            }
        }
    };
    
    // remove highlighting
    this.remove = function()
    {
        var arr = document.getElementsByTagName(hiliteTag);
        while(arr.length && (el = arr[0])) {
            var parent = el.parentNode;
            parent.replaceChild(el.firstChild, el);
            parent.normalize();
        }
    };
    
    // start highlighting at target node
    this.apply = function(input, e)
    {
        //this.remove();
        if(input === undefined || !(input = input.replace(/(^\s+|\s+$)/g, ""))) {
            return;
        }
        if(this.setRegex(input)) {
            this.hiliteWords(targetNode, e);
        }
        return matchRegExp;
    };
}
