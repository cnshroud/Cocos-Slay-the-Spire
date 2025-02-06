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
    private ismove: boolean = false;
    // 在类的属性中添加变量来存储触摸起始点的位置
    private touchStartPos: { x: number, y: number } | null = null;
    //卡牌原来位置
    private cardPos: { x: number, y: number } | null = null;

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
     * 卡牌宽高变化
     */
    changeSize(width: number, height: number) {
        
        this.node.getComponent(UITransform).width += width;
        this.node.getComponent(UITransform).height += height;
    }

    /**
     * 当手指触点落在卡牌内时
     */
    touchStart(e: EventTouch) {
        console.log("touchStart");
        console.log("是否开始移动",this.ismove);
        this.ismove = true;
        // 获取触摸起始点的位置
        this.touchStartPos = e.getLocation();
        // 获取卡牌的初始位置
        this.cardPos = this.node.getPosition();
        console.log("touchStartPos",this.touchStartPos);
        this.changeSize(50,100);
    }
    /**
     * 当手指离开卡牌时
     */
    touchEnd() {
        console.log("touchEnd");  
        console.log("是否开始移动",this.ismove);
        this.ismove = false;
        this.changeSize(-50,-100);
        this.node.setPosition(this.cardPos.x,this.cardPos.y,0);
    }
    /**
     * 当手指在卡牌上移动时
     */
    touchMove(e: EventTouch) {
        console.log("touchMove");
        if (this.ismove) {
            const chaX =e.getLocation().x-this.touchStartPos.x; 
            const chaY =e.getLocation().y-this.touchStartPos.y;
            // 更新触摸起始点的位置
            this.touchStartPos = e.getLocation(); 
            // 更新卡牌的位置
            this.node.setPosition(this.node.getPosition().x+chaX, this.node.getPosition().y+chaY, 0);

            
        }

    }



}


