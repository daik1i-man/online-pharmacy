import telebot
from telebot.types import ReplyKeyboardMarkup, KeyboardButton, WebAppInfo

bot = telebot.TeleBot('7297804599:AAH3I-pbRcI1MyYQ4RRrF4nIhtlUTZ2PtAs')

@bot.message_handler(commands=['start'])
def send_keyboard(message):
    demoAppUrl = WebAppInfo("https://www.app.opharm.uz")
    registerUrl = WebAppInfo("https://www.app.opharm.uz/auth/register")
    loginUrl = WebAppInfo("https://www.app.opharm.uz/auth/login")
    myOrderaUrl = WebAppInfo("https://www.app.opharm.uz/user/orders")
    settings = WebAppInfo("https://www.app.opharm.uz/user/settings")

    keyboard = ReplyKeyboardMarkup(resize_keyboard=True)
    
    demoButton = KeyboardButton(text="Demo", web_app=demoAppUrl)
    registerButton = KeyboardButton(text="👤 Register", web_app=registerUrl)
    loginButton = KeyboardButton(text="👤 Login", web_app=loginUrl)
    ordersButton = KeyboardButton(text=" 💳 My orders", web_app=myOrderaUrl)
    settingsButton = KeyboardButton(text="⚙️ Settings", web_app=settings)
    contactButton = KeyboardButton(text="☎️ Contacts")
    
    keyboard.add(demoButton)
    keyboard.add(loginButton, registerButton)
    keyboard.add(ordersButton, settingsButton)
    keyboard.add(contactButton)
    
    bot.send_message(message.chat.id, "🎉 Welcome to App Opharm bot!", reply_markup=keyboard)
    
@bot.message_handler(func=lambda message: True)
def handle_massage(message):
    if message.text == '☎️ Contacts':
        bot.send_message(message.chat.id, "☎️ Phone for inquiries: +998 94 235 19 06")
    else :
        bot.send_message(message.chat.id, "You entered the wrong command. 😤")  
bot.polling()
