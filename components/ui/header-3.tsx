import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';

const Logo = () => (
	<div className="flex items-center gap-2">
		<img src="/logo.png" alt="Protent" className="h-8 w-auto shrink-0" />
		<span className="text-lg font-bold tracking-tight text-white">protent</span>
	</div>
);

function scrollToSection(id: string) {
	document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'fixed left-0 right-0 top-0 z-50 w-full border-b border-transparent transition-colors duration-200',
				scrolled
					? 'border-white/[0.06] bg-[#06060a]/90 backdrop-blur-md'
					: 'bg-transparent',
			)}
		>
			<nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-5 md:px-8">
				<div className="flex items-center gap-6">
					<a href="#" onClick={(e) => e.preventDefault()} className="shrink-0">
						<Logo />
					</a>
					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<button
										onClick={() => scrollToSection('platform')}
										className="rounded-md px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white"
									>
										Platform
									</button>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<button
										onClick={() => scrollToSection('impact')}
										className="rounded-md px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white"
									>
										Impact
									</button>
								</NavigationMenuLink>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<button
										onClick={() => scrollToSection('compliance')}
										className="rounded-md px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white"
									>
										Trust
									</button>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div className="hidden items-center gap-2 md:flex">
					<Button variant="outline" asChild>
						<a href="https://console.protent.ai">Login</a>
					</Button>
					<Button variant="outline" asChild>
						<a href="#/form">Get in touch</a>
					</Button>
				</div>

				<Button
					size="icon"
					variant="ghost"
					onClick={() => setOpen(!open)}
					className="md:hidden text-white hover:bg-white/10 hover:text-white"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>

			<MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
				<div className="flex flex-col gap-4">
					<button
						type="button"
						className="text-left text-sm text-zinc-300 transition hover:text-white"
						onClick={() => { scrollToSection('platform'); setOpen(false); }}
					>
						Platform
					</button>
					<button
						type="button"
						className="text-left text-sm text-zinc-300 transition hover:text-white"
						onClick={() => { scrollToSection('impact'); setOpen(false); }}
					>
						Impact
					</button>
					<button
						type="button"
						className="text-left text-sm text-zinc-300 transition hover:text-white"
						onClick={() => { scrollToSection('compliance'); setOpen(false); }}
					>
						Trust
					</button>
					<a
						href="https://console.protent.ai"
						className="text-left text-sm font-medium text-zinc-400 transition hover:text-white"
						onClick={() => setOpen(false)}
					>
						Login
					</a>
				</div>
				<a
					href="#/form"
					className="w-full rounded-full bg-white py-3 text-center text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
				>
					Get in touch
				</a>
			</MobileMenu>
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-[#06060a]/95 backdrop-blur-lg',
				'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-white/[0.06] md:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
					'size-full p-5',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}

function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}
