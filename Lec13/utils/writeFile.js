import fs from 'fs/promises'

export default async function writeFile(filePath, data){
    await fs.writeFile(filePath, typeof data === 'string' ? data : JSON.stringify(data))
    console.log('writed successfully')
}