export async function GET(){
    try {

        return NextResponse.json({message:"Get Request"})
        
    } catch (error) {
        console.log(error.message)
        
    }
}