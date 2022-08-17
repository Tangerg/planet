import React from 'react'
import ReactDOM from 'react-dom'
import "antd/dist/antd.less"
import {RecoilRoot} from 'recoil';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import routes from './routes';
import './style/index.less'

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                {renderRoutes(routes)}
            </BrowserRouter>
        </RecoilRoot>

    </React.StrictMode>,
    document.getElementById('root')
)
