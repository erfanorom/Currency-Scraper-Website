from flask import Flask, jsonify, abort, render_template
import requests
import bs4
import datetime
import pytz
import re

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/api/data')
def get_data():
    try:
        r = requests.get("https://www.tgju.org/")
        code = bs4.BeautifulSoup(r.text, "html.parser")
        title = code.find_all('td', class_='market-price')
        table = code.find('table', class_='dataTable index-tabs-table data-table market-section-right market-table mobile-half')
        mf = table.find_all('span', class_='mini-flag')
        th = table.find_all('th')
        table2 = code.find('table', class_='dataTable index-tabs-table data-table market-table mobile-half')
        mf2 = table2.find_all('span', class_='mini-flag')
        th2 = table2.find_all('th')

        if not (title and th and th2 and mf and mf2):
            abort(500)

        price = []
        name1 = []
        name2 = []
        mini_flag = []
        for i in range(len(th) - 7 + len(th2) - 7):
            price.append(title[i].text)
        for j in range(7, len(th)):
            name1.append(th[j].text)
            name2.append(th2[j].text)
        for i in range(len(mf)):
            mini_flag.append(re.findall("-.." ,str(mf[i]))[1])
        for i in range(len(mf2)):
            mini_flag.append(re.findall("-.." ,str(mf2[i]))[1])    
        name = name1 + name2
        date = datetime.datetime.now(pytz.timezone('Asia/Tehran')).strftime("%H:%M:%S")

        return jsonify({
            'price': price,
            'name': name,
            'date': date,
            'mini_flag': mini_flag
        })
    except Exception:
        abort(500)

if __name__ == '__main__':
    app.run(debug=True)
