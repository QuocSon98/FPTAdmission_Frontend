import { GraduationCap } from 'lucide-react'
import React from 'react'

export const HeaderBox: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 shadow-lg">
            <div className="flex items-center gap-3">
                <GraduationCap size={32} />
                <div>
                    <h1 className="text-2xl font-bold">AI Admissions Assistant</h1>
                    <p className="text-orange-100 text-sm">
                        Your personal guide to college admissions
                    </p>
                </div>
            </div>
        </div>
    )
}