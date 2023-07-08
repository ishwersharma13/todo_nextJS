import './globals.css'
import {TodosProvider} from "@/store/todos";

export const metadata = {
    title: 'Todo App',
    description: 'Todo App',
}


export default function RootLayout({
  children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <TodosProvider>
            {children}
        </TodosProvider>
        </body>
        </html>
    )
}







