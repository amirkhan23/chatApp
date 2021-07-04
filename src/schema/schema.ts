import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLSchema, } from 'graphql';
import * as UserController from '../Controllers/User';
import { createGroup, getAllGroup } from "../Database/mongodb/Group";
import { getAllMessagesOfGroup, saveMessage } from "../Database/mongodb/Messages";

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and descibes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   

const LoginType = new GraphQLObjectType({
    name: "login",
    fields: () => ({
        accessToken: { type: GraphQLString }
    })
});

const LogoutType = new GraphQLObjectType({
    name: "logout",
    fields: () => ({
        token: { type: GraphQLString }
    })
});

const UserType = new GraphQLObjectType({
    name: "user",
    fields: () => ({
        _id: { type: GraphQLString },
        userName: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        role: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
        updatedAt: { type: GraphQLInt }
    })
});

const GroupType = new GraphQLObjectType({
    name: "group",
    fields: () => ({
        _id: { type: GraphQLString },
        groupName: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
    })
})

const MessageType = new GraphQLObjectType({
    name: "message",
    fields: () => ({
        _id: { type: GraphQLString },
        groupId: { type: GraphQLString },
        userId: { type: GraphQLString },
        message: { type: GraphQLString },
        createdAt: { type: GraphQLInt },
    })
})

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book 
//or get a particular author.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type: LoginType,
            //argument passed by the user while making the query
            args: { userName: { type: GraphQLString }, password: { type: GraphQLString } },
            async resolve(parent: any, args: any) {
                //Here we define how to get data from database source
                const a = await UserController.login({ password: args.password, userName: args.userName })
                console.log(a)
                return a;
            }
        },
        logout: {
            type: LogoutType,
            args: { token: { type: GraphQLString } },
            async resolve(parent: any, args: any) {
                const a = await UserController.logout(args.token)
                console.log(a)
                return a;
            }
        },
        group: {
            type: new GraphQLList(GroupType),
            args: { _id: { type: GraphQLString }, pageNo: { type: GraphQLInt }, limit: { type: GraphQLInt } },
            async resolve(parent: any, args: any) {
                const a = await getAllGroup(args.pageNo, args.limit, args._id)
                console.log(a)
                return a;
            }
        },
        message: {
            type: new GraphQLList(MessageType),
            args: { groupId: { type: GraphQLString } },
            async resolve(parent: any, args: any) {
                const a = await getAllMessagesOfGroup(args.groupId)
                console.log(a)
                return a;
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                //GraphQLNonNull make these field required
                userName: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const usr = await UserController.registerUser({ password: args.password, userName: args.userName });
                console.log(usr);
                return usr;
            }
        },
        addGroup: {
            type: GroupType,
            args: { groupName: { type: GraphQLString } },
            async resolve(parent, args) {
                const grp = await createGroup(args.groupName);
                console.log(grp)
                return grp;
            }
        },
        addMessage: {
            type: MessageType,
            args: {
                groupId: { type: GraphQLString },
                userId: { type: GraphQLString },
                message: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const msg = await saveMessage(args.groupId, args.userId, args.message)
                console.log(msg);
                return msg;
            }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
export { schema }