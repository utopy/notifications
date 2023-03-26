export type NotificationType = "notification" | "card"

export interface NotificationParams {

	title: string
	prefix?: string
	subtitle: string | null,
	body?: string,
	type: NotificationType,
	hasToggle?: boolean,
	cancelLabel?: string,
	confirmLabel?: string,
	onConfirm?: (notification: Notification) => void
	onCancel?: (notification: Notification) => void

}

export default class Notification {

	target: HTMLElement
	params: NotificationParams

	toggled: boolean;

	private _component: HTMLElement

	private baseParams: NotificationParams = {
		title: "Notification title",
		subtitle: null,
		type: "notification",
		hasToggle: false,
		prefix: "un-"
	}

	constructor(params: NotificationParams, target: HTMLElement) {

		this.target = target
		this.params = { ...this.baseParams, ...params }
		this._component = this.createComponent(this.params.type)
		this.toggled = true;

		if (this.params.type === "notification") this.startTimeout()

	}


	private startTimeout() {

		setTimeout(() => {

			this.toggled = false
			this.component.remove()

		}, 10000)

	}


	get component() {

		return this._component

	}

	private setClass(className: string, element: HTMLElement) {

		element.classList.add(`${this.params.prefix}${className}`)

		return element

	}

	private async onCancel(button: HTMLButtonElement, handler:any) {

		button.removeEventListener("click", handler)
		if (this.params.onCancel) await this.params.onCancel(this)
		this.component.remove()

	}

	private async onConfirm(button: HTMLButtonElement, handler:any) {

		button.removeEventListener("click", handler)
		if (this.params.onConfirm) await this.params.onConfirm(this)
		this.component.remove()

	}

	private createComponent(type: NotificationType) {

		if (type === "notification") return this.createNotificationComponent()
		if (type === "card") return this.createCardComponent()
		else return this.createNotificationComponent()

	}

	private createNotificationComponent() {

		const component = document.createElement("div")
		this.setClass("container", component)

		const titleComponent = this.titleComponent(this.params.title, this.params.hasToggle!)
		component.appendChild(titleComponent)

		return component
	}

	private createCardComponent() {

		const _this = this;
		const container = document.createElement("div")
		this.setClass("card-container", container)

		const component = document.createElement("div")
		this.setClass("card", component)

		const titleComponent = this.titleComponent(this.params.title, this.params.hasToggle!)
		component.appendChild(titleComponent)


		const body = document.createElement("p")
		body.innerText = this.params.body ?? ""
		this.setClass("card-body", body)
		component.appendChild(body)

		const actions = document.createElement("div")
		this.setClass("card-actions", actions)

		const confirmAction = document.createElement("button")
		this.setClass("card-action", confirmAction)
		this.setClass("card-action-confirm", confirmAction)
		confirmAction.innerText = this.params.confirmLabel ?? "Confirm"

		confirmAction.addEventListener("click", function handler(e){
			e.preventDefault()
			_this.onConfirm(confirmAction, handler)
		})

		const cancelAction = document.createElement("button")
		this.setClass("card-action", cancelAction)
		this.setClass("card-action-cancel", cancelAction)
		cancelAction.innerText = this.params.cancelLabel ?? "Cancel"

		cancelAction.addEventListener("click", function handler(e){
			e.preventDefault()
			_this.onCancel(cancelAction, handler)
		})

		actions.appendChild(confirmAction)
		actions.appendChild(cancelAction)

		component.appendChild(actions)
		container.appendChild(component)

		return container
	}

	private titleComponent(value: string, hasToggle: boolean) {

		const container = document.createElement("div")

		this.setClass("title-container", container)

		const title = document.createElement("h3")
		this.setClass("title", title)
		title.innerText = value;

		container.appendChild(title)

		if (hasToggle) {

			const notificationToggle = document.createElement("div")
			this.setClass("close-button", notificationToggle)
			notificationToggle.innerText = "✖";
			container.appendChild(notificationToggle)

		}

		return container

	}

}
