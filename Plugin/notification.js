// notification.js
export default function showNotification(message, color) {
    console.log("showNotification called with message:", message);
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.left = "20px";
    notification.style.backgroundColor = color;
    notification.style.color = "white";
    notification.style.padding = "10px";
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "1000";
    notification.style.transition = "opacity 0.5s";
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 500);
    }, 3000);
}
