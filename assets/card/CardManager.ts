import { _decorator, Component, EventTouch, Label, Node, tween, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CardManager')
export class CardManager extends Component {
    @property({
        displayName: "cardName",
        type: Label
    })
    cardName: Label = null;
    @property({
        displayName: "cardType",
        type: Label
    })
    cardType: Label = null;
    @property({
        displayName: "cardEffect",
        type: Label
    })
    cardEffect: Label = null;
    /**
     * 要根据卡的id来获取卡的信息
     */
    public cardId: number;

    //判断是否移动
    ismove: boolean = false;

    start() {
        this.initLiestenr();
    }
    /**
     * 初始化监听
     * 防止重复监听, 所以需要先解绑再绑定
     */
    initLiestenr() {
        this.node.off(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.touchEnd, this);

        this.node.on(Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    /**
     * 当手指触点落在卡牌内时
     */
    touchStart() {
        console.log("touchStart");
        this.ismove = true;
        this.node.getComponent(UITransform).width += 50;
        this.node.getComponent(UITransform).height += 100;
    }
    /**
     * 当手指离开卡牌时
     */
    touchEnd() {
        console.log("touchEnd");
        this.node.getComponent(UITransform).width -= 50;
        this.node.getComponent(UITransform).height -= 100;
    }
    /**
     * 当手指在卡牌上移动时
     */
    touchMove(e: EventTouch) {
        console.log("touchMove");
        if (this.ismove) {
            this.node.setPosition(e.getLocation().x, e.getLocation().y, 0);
        }
    }



}


