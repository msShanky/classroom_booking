import React from "react";
import { Grid, TextInput, PasswordInput, Checkbox, Button, Title, Text, Anchor, Image, Paper } from "@mantine/core";
import Link from "next/link";

const Login = () => {
	return (
		<Grid className="bg-slate-200 mt-20 grid grid-cols-2 items-center">
			<Grid.Col>
				<Image className="h-full" src="/assets/login_vector_art.svg" alt="With default placeholder" />
			</Grid.Col>
			<Grid.Col>
				<Paper className="w-8/12 mx-auto drop-shadow-2xl p-10 rounded-lg flex flex-col">
					<Title order={2} className="text-4xl font-sans font-normal text-primary-600" align="center" mt="md" mb={50}>
						Welcome Back!
					</Title>
					<TextInput label="Email address" placeholder="hello@gmail.com" size="md" />
					<PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
					<Checkbox label="Keep me logged in" mt="xl" size="md" />
					<Button className="text-neutral-800 bg-secondary-400 self-center" mt="xl" size="md">
						Login
					</Button>
					<Text className="text-center mt-8">
						Don&apos;t have an account?{" "}
						<Link href="/signup" passHref>
							<Anchor className="p-0 text-primary-600 hover:bg-none">Register</Anchor>
						</Link>
					</Text>
				</Paper>
			</Grid.Col>
		</Grid>
	);
};

export default Login;
