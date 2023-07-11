"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
    return () => {};
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="Promtodia Logo"
          width={30}
          height={30}
        />
        <p className="logo_text">Promtopida</p>
      </Link>
      {/* Desktop naviagation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href={"/profile"} className="flex gap-2 flex-center">
              <Image
                src={session?.user?.image}
                alt="Profile Icon"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="outline_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile naviagation  */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div>
            <Image
              src={session?.user?.image}
              alt="Profile Icon"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((p) => !p)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown((p) => !p)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown((p) => !p)}
                >
                  Create Prompt
                </Link>
                <button type="button" onClick={signOut} className="outline_btn">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="outline_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
