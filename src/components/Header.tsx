import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { RoutesEnum } from '@/constants/routes.constants';
import { createClient } from '@/lib/supabase/server';
import { signOutAction } from '@/actions/auth.actions';

const Header = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <header className="container py-2">
      <nav className="flex justify-center">
        <ul className="flex gap-4">
          <li>
            <Button variant="link">
              <Link
                href={RoutesEnum.BASE}
                className="flex gap-2 items-center text-lg"
              >
                <span>Home</span> <ArrowRight />
              </Link>
            </Button>
          </li>
          {data.user ? (
            <>
              <li>
                <Button variant="link">
                  <Link
                    href={RoutesEnum.TASKS}
                    className="flex gap-2 items-center text-lg"
                  >
                    <span>Tasks</span> <ArrowRight />
                  </Link>
                </Button>
              </li>
              <li>
                <form action={signOutAction}>
                  <Button
                    type="submit"
                    variant="link"
                    className="flex gap-2 items-center text-lg"
                  >
                    <span>Sign out</span> <ArrowRight />
                  </Button>
                </form>
              </li>
            </>
          ) : (
            <>
              <li>
                <Button variant="link">
                  <Link
                    href={RoutesEnum.SIGN_IN}
                    className="flex gap-2 items-center text-lg"
                  >
                    <span>Sign in</span> <ArrowRight />
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link">
                  <Link
                    href={RoutesEnum.SIGN_UP}
                    className="flex gap-2 items-center text-lg"
                  >
                    <span>Sign up</span> <ArrowRight />
                  </Link>
                </Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
