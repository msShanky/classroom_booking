import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { addUser } from "../../../utils/firebase/database"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: '347469440046-0pfib8kultmfhefvc075k53bqnsqqt91.apps.googleusercontent.com',
            clientSecret: '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'
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            try {
                await addUser({ ...user, provider: account.provider })
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            return true
        },
        async session({ session, token }) {
            session.id = token.sub
            return session
        }
    }
})

