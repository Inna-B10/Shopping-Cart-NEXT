import { Cinzel_Decorative, El_Messiri } from 'next/font/google'
import Image from 'next/image'
import styles from './page.module.css'

const cinzel = Cinzel_Decorative({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-cinzel',
	display: 'swap',
})
const messiri = El_Messiri({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-messiri',
	display: 'swap',
})

export default function Home() {
	return (
		<main className={styles.main}>
			<section className={styles.galleryWrap}>
				<h2 className={styles.galleryTitle}>Latest Additions</h2>
				<div className={styles.gallery}>Gallery</div>
			</section>
			<section id='rings' className={`${styles.ctgWrap} flex column`}>
				<div className={styles.ctgUpper}>
					<h2 className={`${styles.ctgTitle} ${cinzel.variable}`}>Rings</h2>
					<p>
						When choosing between gold and silver rings, it's important to
						consider the benefits of each type. Gold rings are known for their
						timeless elegance and durability, while silver rings are valued for
						their affordability and versatility. Both options have their unique
						appeal, so it ultimately depends on your personal style and budget.
					</p>
				</div>
				<div className={`${styles.ctgBottom} flex`}>
					<div className={styles.subCatSilver}>
						<figure className={styles.imgSilver}>
							<Image
								src={'/media/1/silver.png'}
								width={500}
								height={400}
								alt='Silver Rings'
								quality={100}
							/>
						</figure>
						<h3
							className={`${styles.ribbonSilver} ${styles.subcatTitle} ${messiri.variable}`}>
							Silver rings
						</h3>
					</div>
					<div>
						<figure className={styles.imgGold}>
							<Image
								src={'/media/1/gold.png'}
								width={500}
								height={400}
								alt='Gold Rings'
								quality={100}
							/>
						</figure>
						<h3
							className={`${styles.ribbonGold} ${styles.subcatTitle} ${messiri.variable}`}>
							Gold rings
						</h3>
					</div>
				</div>
			</section>
			<section id='discount'>
				<div>sale 15%</div>
			</section>
			<section id='earrings'>
				<h2>Earrings</h2>
			</section>
			<section className={styles.galleryWrap}>
				<h2 className={styles.galleryTitle}>Trendy</h2>
				<div className={styles.gallery}>Gallery</div>
			</section>
			<section id='bracelets'>
				<h2>Bracelets</h2>
			</section>
			<section id='discount'>
				<div>sale 25%</div>
			</section>
			<section id='necklaces'>
				<h2>Necklaces</h2>
			</section>
			<section id='discount'>
				<div>Outlet</div>
			</section>
			<section id='sets'>
				<h2>Brooches, pendants, anklets</h2>
			</section>
			<section id='contact'>
				<h2>Contact</h2>
			</section>
		</main>
	)
}
