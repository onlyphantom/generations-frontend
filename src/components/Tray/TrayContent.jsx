import React from 'react'
import TrayCard from './TrayCard'

const TrayContent = ({ tray, setTray }) => {
    return (
        <div>
            <h2 className='m-4'>Learning Tray</h2>

            {
                tray.length === 0
                    ? <p className='prose m-4'>You have not added any lesson yet.</p>
                    : <>
                        <TrayCard setTray={setTray} />
                        <TrayCard setTray={setTray} />
                    </>
            }



            <p className="text-xs text-gray-500">{JSON.stringify(tray)}</p>
        </div>
    )
}

export default TrayContent