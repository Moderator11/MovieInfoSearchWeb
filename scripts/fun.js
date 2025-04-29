/** @type {HTMLCanvasElement} */ let cvs;
/** @type {CanvasRenderingContext2D} */ let ctx;
/** @type {Element} */ let cardCurrent = null;
/** @type {DOMRect} */ let cardDOMRect;
let cardX, cardY, mouseX, mouseY;
let renderer = null;
const originalStyle = "perspective(1000px)";

let previousScrollY = window.scrollY;
let previousScrollX = window.scrollX;

export default function ResetAnimationTarget() {
    let cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("mouseenter", OnMouseEnter);
        cards[i].addEventListener("mouseleave", OnMouseExit);
        cards[i].addEventListener("mousemove", OnMouseMove);
        let c = document.createElement("canvas");
        c.width = cards[i].offsetWidth;
        c.height = cards[i].offsetHeight;
        cards[i].append(c);
    }

    /** @param {WheelEvent} event */
    document.addEventListener("scroll", (event) => {
        const currentScrollY = window.scrollY;
        const currentScrollX = window.scrollX;

        const deltaY = currentScrollY - previousScrollY;
        const deltaX = currentScrollX - previousScrollX;

        cardX -= deltaX;
        cardY -= deltaY;

        // scroll event to check mouse hover is SO HARD TO IMPLEMENT
        // console.log(mouseX, mouseY);
        // let efp = document.elementsFromPoint(mouseX, mouseY);
        // if (efp.length > 0) {
        //     let p = document.elementsFromPoint(mouseX, mouseY)[0].parentElement;
        //     if (cardCurrent == null) {
        //         OnMouseEnter({ currentTarget: p });
        //     }
        //     if (p !== cardCurrent) {
        //         console.log("a");
        //         OnMouseExit();
        //     } else {
        //         console.log("b");
        //     }
        // }

        RenderCardTransformation();

        previousScrollY = currentScrollY;
        previousScrollX = currentScrollX;
    });
}

function RenderCardTransformation() {
    if (cardDOMRect == null) return;
    let diffX = ((cardX - mouseX) / cardDOMRect.width) * 2;
    let diffY = ((cardY - mouseY) / cardDOMRect.height) * 2;
    //console.log("diff : " + diffX + ", " + diffY);
    let x = diffY;
    let y = -diffX;
    let z = 0;
    let deg = 30 * Math.sqrt(x * x + y * y);
    //console.log("rotate3d(" + x + ", " + y + ", " + z + ", " + "30deg)");
    if (cardCurrent != null)
        cardCurrent.style.transform =
            originalStyle +
            "scale(1.2)" +
            "rotate3d(" +
            x +
            ", " +
            y +
            ", " +
            z +
            ", " +
            deg +
            "deg)";
    DrawShadow(diffY);
}

//#region ShadowRendering

function DrawShadow(diffY) {
    if (isNaN(diffY)) return;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    let w = diffY > 0 ? 255 : 0;
    let a = Math.abs(diffY) / 6;
    ctx.fillStyle = "rgba(" + w + ", " + w + ", " + w + ", " + a + ")";
    ctx.fillRect(0, 0, cardDOMRect.width, cardDOMRect.height);
}

function ResetShadow() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
}

//#endregion

//#region MouseEventsHandling

/** @param {MouseEvent} event */
function OnMouseEnter(event) {
    cardCurrent = event.currentTarget;
    cardCurrent.style.zIndex = 999;
    cardDOMRect = cardCurrent.getBoundingClientRect();
    cardX = cardDOMRect.x + cardDOMRect.width / 2;
    cardY = cardDOMRect.y + cardDOMRect.height / 2;
    cvs = cardCurrent.getElementsByTagName("canvas")[0];
    ctx = cvs.getContext("2d");
    renderer = requestAnimationFrame(RenderCardTransformation);
    //card_current.style.transform = "rotate(0.5turn)";
}

/** @param {MouseEvent} event */
function OnMouseExit(event) {
    cancelAnimationFrame(renderer);
    cardCurrent.style.zIndex = 0;
    cardCurrent.style.transform = originalStyle;
    cardCurrent = null;
    ResetShadow();
}

/** @param {MouseEvent} event */
function OnMouseMove(event) {
    if (cardCurrent == null) OnMouseEnter(event); //When mouse was already over card since page load
    mouseX = event.pageX - window.scrollX;
    mouseY = event.pageY - window.scrollY;
    renderer = requestAnimationFrame(RenderCardTransformation);
}

//#endregion
